import os

def get_cors_origins() -> list[str]:
    origins = [
        "http://localhost:5173",
        "http://frontend:5173",
    ]
    frontend_origin = os.getenv("FRONTEND_ORIGIN")
    if frontend_origin:
        origins.append(frontend_origin)
    return origins

