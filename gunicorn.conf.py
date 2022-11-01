bind = "localhost:8081"
reload = True
preload_app = True
proc_name = "huggingface-translations"
loglevel = 'debug'
errorlog = 'hft-logs.log'
worker_class = "uvicorn.workers.UvicornWorker"
workers = 4