from pydantic import BaseModel, Field
from typing import Optional
from app.models.media import MediaType, MediaStatus

class MediaCreate(BaseModel):
    tmdb_id: int
    title: str
    media_type: MediaType
    poster_url: Optional[str] = None
    genre: Optional[list[str]] = []
    overview: Optional[str] = None
    release_year: Optional[int] = None
    total_episodes: Optional[int] = None  # for web series
    total_seasons: Optional[int] = None   # for web series
    status: MediaStatus = MediaStatus.PLAN_TO_WATCH
    rating: Optional[float] = Field(None, ge=0, le=10)
    notes: Optional[str] = None

class MediaUpdate(BaseModel):
    status: Optional[MediaStatus] = None
    rating: Optional[float] = Field(None, ge=0, le=10)
    notes: Optional[str] = None

class MediaResponse(MediaCreate):
    id: str