from starlette.applications import Starlette
from starlette.routing import Route
from starlette.responses import PlainTextResponse, JSONResponse, HTMLResponse
from io import BytesIO
from PIL import Image
import Captioner


def homepage(request):
    return HTMLResponse('''<form enctype="multipart/form-data" method="post" action="/analyze">
    <div><span>SELECT IMAGE</span></div>
    <input name="file" type="file" />
    </div>
    <button type="submit">
    <span>Analyze</span>
    </button>
    </form>
    <div id="r''')


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
    Route('/', homepage),
    Route('/api/analyze', analyser, methods=["POST"])
]

app = Starlette(debug=True, on_startup=[startup], routes=routers)
