from datetime import datetime
from bson import ObjectId
from app.core.database import get_db
from app.schemas.media import MediaCreate, MediaUpdate

COLLECTION = "collection"

def serialize(doc) -> dict:
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

async def add_to_collection(data: MediaCreate):
    db = get_db()
    # check if already exists
    existing = await db[COLLECTION].find_one({"tmdb_id": data.tmdb_id, "media_type": data.media_type})
    if existing:
        return {"error": "Already in your collection"}

    doc = data.model_dump()
    doc["created_at"] = datetime.utcnow()
    doc["updated_at"] = datetime.utcnow()

    result = await db[COLLECTION].insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc.pop("_id")
    return doc

async def get_collection(media_type: str = None):
    db = get_db()
    query = {}
    if media_type:
        query["media_type"] = media_type

    cursor = db[COLLECTION].find(query).sort("created_at", -1)
    results = []
    async for doc in cursor:
        results.append(serialize(doc))
    return results

async def get_one(item_id: str):
    db = get_db()
    doc = await db[COLLECTION].find_one({"_id": ObjectId(item_id)})
    return serialize(doc) if doc else None

async def update_item(item_id: str, data: MediaUpdate):
    db = get_db()
    update = {k: v for k, v in data.model_dump().items() if v is not None}
    update["updated_at"] = datetime.utcnow()

    await db[COLLECTION].update_one(
        {"_id": ObjectId(item_id)},
        {"$set": update}
    )
    return await get_one(item_id)

async def delete_item(item_id: str):
    db = get_db()
    await db[COLLECTION].delete_one({"_id": ObjectId(item_id)})
    return {"message": "Deleted successfully"}