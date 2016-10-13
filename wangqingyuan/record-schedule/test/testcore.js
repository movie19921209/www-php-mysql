var core = require("../core")
var db = require("../db")
db.config('e:\\scheduletest')
var data = [{
    "name": "1000", "id": "1D55448C953D467EEB2DCB22562C1AA7",
    "type": 0,
    "start": "2016-9-2 14:54:00",
    "end": "2016-9-2 14:55:00",
    "liveUrl": "e:\\wfsroot\\somebody.flv"
}]

data = [{
    "name": "1000", "id": "1D55448C953D467EEB2DCB22562C1AA7",
    "type": 1,
    "start": "15:09",
    "end": "15:10",
    "liveUrl": "e:\\wfsroot\\somebody.flv"
}]
core.start(data, { store: 'e:\\scheduletest' })
