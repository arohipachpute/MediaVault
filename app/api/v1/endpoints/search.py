from fastapi import APIRouter, Query
from app.services.tmdb import search_tmdb, get_tmdb_details

router = APIRouter()

@router.get("/search")
async def search(
    query: str = Query(..., description="Movie or series name"),
    media_type: str = Query("movie", description="movie or web_series")
):
    results = await search_tmdb(query, media_type)
    return {"results": results}


@router.get("/details/{tmdb_id}")
async def details(tmdb_id: int, media_type: str = Query("movie")):
    result = await get_tmdb_details(tmdb_id, media_type)
    return result