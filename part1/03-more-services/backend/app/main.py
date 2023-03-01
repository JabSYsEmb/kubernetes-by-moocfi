import os
from aiocache import Cache
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

cache = Cache(Cache.REDIS,
            endpoint=os.environ['REDIS_HOST'],
            port=os.environ['REDIS_PORT'],
            namespace=os.environ['REDIS_NAMESPACE'])

app = FastAPI()

# CORS enabled for some URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Counter():
    def __init__(self):
        pass
    async def get_count(self) -> int:
        return await cache.get("count", default=0)
    async def set_count(self, value: int) -> None:
        await cache.set("count", value)
    async def increment_count(self, n: int = 1) -> None:
        await cache.increment("count", n)

counter = Counter()

@app.get("/", response_class=HTMLResponse)
async def root():
    count = await counter.get_count()
    await counter.increment_count()
    return """
        <html>
            <body>
                <h1>
                    pong {}
                </h1>
            </body>
        </html>
    """.format(count)
