from redis import from_url
from rq import Connection, Worker, Queue
import os

listen = ['default']
redis_url = "redis://localhost:10000"
conn = from_url(redis_url)

if __name__ == '__main__':
    print("IS MAIN!")
    with Connection(conn):
        worker = Worker(list(map(Queue, listen)))
        worker.work()
