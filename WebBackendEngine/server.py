from starlette.applications import Starlette
from starlette.routing import Route
from starlette.responses import PlainTextResponse, HTMLResponse


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
    return PlainTextResponse(f"Got it {_filename}")


def startup():
    print("Engine Started")


app = Starlette(debug=True, on_startup=[startup], routes=[
    Route('/', homepage),
    Route('/analyze', analyser, methods=["POST"])
])
