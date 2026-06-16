import httpx
from app.core.config import settings

async def search_tmdb(query: str, media_type: str):
    """Search movies or web series on TMDB"""
    endpoint = "movie" if media_type == "movie" else "tv"
    url = f"{settings.TMDB_BASE_URL}/search/{endpoint}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params={
            "api_key": settings.TMDB_API_KEY,
            "query": query,
            "language": "en-US",
            "page": 1
        })
        data = response.json()

    results = []
    for item in data.get("results", [])[:10]:
        results.append({
            "tmdb_id": item.get("id"),
            "title": item.get("title") or item.get("name"),
            "overview": item.get("overview"),
            "poster_url": f"{settings.TMDB_IMAGE_BASE}{item['poster_path']}" if item.get("poster_path") else None,
            "release_year": (item.get("release_date") or item.get("first_air_date") or "")[:4],
            "media_type": media_type,
        })

    return results


async def get_tmdb_details(tmdb_id: int, media_type: str):
    """Get full details of a movie or web series"""
    endpoint = "movie" if media_type == "movie" else "tv"
    url = f"{settings.TMDB_BASE_URL}/{endpoint}/{tmdb_id}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params={
            "api_key": settings.TMDB_API_KEY,
            "language": "en-US"
        })
        item = response.json()

    return {
        "tmdb_id": item.get("id"),
        "title": item.get("title") or item.get("name"),
        "overview": item.get("overview"),
        "poster_url": f"{settings.TMDB_IMAGE_BASE}{item['poster_path']}" if item.get("poster_path") else None,
        "release_year": (item.get("release_date") or item.get("first_air_date") or "")[:4],
        "genre": [g["name"] for g in item.get("genres", [])],
        "total_seasons": item.get("number_of_seasons"),
        "total_episodes": item.get("number_of_episodes"),
        "media_type": media_type,
    }