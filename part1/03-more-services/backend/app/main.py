from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

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
        self.counter = 0;
    def get_count(self) -> int:
        return self.counter;
    def set_count(self, val: int) -> None:
        self.counter = val;
    def increment_count(self, increase_by: int = 1) -> None:
        self.counter += increase_by;

counter = Counter()

@app.get("/", response_class=HTMLResponse)
async def root():
    temp = counter.get_count()
    counter.increment_count()
    return """
        <html>
            <body>
                <h1>
                    pong {}
                </h1>
            </body>
        </html>
    """.format(temp)
