from enum import Enum

class MediaType(str, Enum):
    MOVIE = "movie"
    WEB_SERIES = "web_series"

class MediaStatus(str, Enum):
    PLAN_TO_WATCH = "plan_to_watch"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    DROPPED = "dropped"