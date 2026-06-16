from fastapi import APIRouter, HTTPException
from app.schemas.media import MediaCreate, MediaUpdate
from app.services.collection import (
    add_to_collection, get_collection,
    get_one, update_item, delete_item
)

router = APIRouter()

@router.post("")
async def add(data: MediaCreate):
    result = await add_to_collection(data)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.get("")
async def get_all(media_type: str = None):
    return await get_collection(media_type)

@router.get("/{item_id}")
async def get_single(item_id: str):
    item = await get_one(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    return item

@router.patch("/{item_id}")
async def update(item_id: str, data: MediaUpdate):
    item = await update_item(item_id, data)
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    return item

@router.delete("/{item_id}")
async def delete(item_id: str):
    return await delete_item(item_id)