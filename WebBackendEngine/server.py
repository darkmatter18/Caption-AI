#  Copyright 2020 Arkadip Bhattacharya
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

import os
import Captioner
from PIL import Image
from io import BytesIO
from starlette.routing import Route, Mount
from starlette.middleware import Middleware
from starlette.applications import Starlette
from starlette.staticfiles import StaticFiles
from starlette.responses import JSONResponse, FileResponse
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware


def homepage(request):
    return FileResponse(os.path.join(os.getcwd(), 'client', 'index.html'))


async def analyser(request):
    try:
        _f = await request.form()
        _fileData = await _f['file'].read()
        image_bytes = BytesIO(_fileData)
        res = app.state.CAPTIONER.predict(Image.open(image_bytes).convert('RGB'))
        return JSONResponse({'res': res})
    except IndexError:
        return JSONResponse({e: "No Data Found"}, 500)


def startup():
    app.state.CAPTIONER = Captioner.Captioner()


routers = [
    Route('/api/analyze', analyser, methods=["POST"]),
    Route('/', homepage, methods=['GET']),
    Route('/result', homepage, methods=['GET']),
    Mount('/', app=StaticFiles(directory='client'), name="FrontEnd")
]

middleware = [
    Middleware(HTTPSRedirectMiddleware)
]

app = Starlette(debug=True, on_startup=[startup], routes=routers)
