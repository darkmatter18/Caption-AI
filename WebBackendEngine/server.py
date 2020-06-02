from starlette.applications import Starlette
from starlette.routing import Route, Mount
from starlette.responses import JSONResponse, HTMLResponse, FileResponse
from starlette.staticfiles import StaticFiles
from io import BytesIO
from PIL import Image
import os
import Captioner


def homepage(request):
    return FileResponse(os.path.join(os.getcwd(), 'client', 'index.html'))


async def analyser(request):
    _f = await request.form()
    _filename = _f['file'].filename
    _fileData = await _f['file'].read()
    image_bytes = BytesIO(_fileData)
    res = app.state.CAPTIONER.predict(Image.open(image_bytes))
    return JSONResponse({'res': res})


def startup():
    app.state.CAPTIONER = Captioner.Captioner()


routers = [
    Route('/api/analyze', analyser, methods=["POST"]),
    Route('/', homepage, methods=['GET']),
    Route('/result', homepage, methods=['GET']),
    Mount('/', app=StaticFiles(directory='client'), name="FrontEnd")
]

app = Starlette(debug=True, on_startup=[startup], routes=routers)
