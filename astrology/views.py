import json

from django.middleware.csrf import _get_new_csrf_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import render

from astrology.models import PlanetZodiacMap


@require_http_methods(["GET"])
def get_lord_planets(request):
    dds = json.loads(request.GET.get("decimalDegs"))
    ddset = {}
    for dd in dds:
        pmz = __fetch_pzm(dd)
        ddset[str(dd)] = {
            "DD": dd,
            "table-DD": pmz.DecimalDeg,
            "RA": pmz.RA,
            "NA": pmz.NA,
            "UA": pmz.UA
        }
    print("DDS:", dds, type(dds), ddset)
    return JsonResponse({"msg": "Success", "decimalDegs": ddset, "success": True}, status=200)


# utility class to fetch PlanetZodiacMap using DecimalDeg as input from DB. DO NOT use as View
def __fetch_pzm(dd):
    lower_limit = dd - 3
    # upper_limit = dd + 2
    pzm_data = PlanetZodiacMap.objects.filter(DecimalDeg__lte=dd).filter(DecimalDeg__gte=lower_limit)
    print("====== PlanetZodiacMap ======")
    dd_list = []
    for pzm in pzm_data:
        dd_list.append(pzm.DecimalDeg)
    if len(dd_list) == 0:
        pzm = PlanetZodiacMap.objects.get(id=1)
    else:
        print("PMZ:MAX:", dd_list, dd, max(dd_list))
        pzm = pzm_data.get(DecimalDeg = max(dd_list))
    print("Final PMZ::", pzm.id, pzm.DecimalDeg, dd)
    return pzm


@ensure_csrf_cookie
def angular_index(request):
    return render(request, 'index.html')


def setup_csrf(request):
    csrf = _get_new_csrf_token()
    print("CSRF::", csrf)
    msg = {
        "msg": "New CSRF Generated",
        "csrftoken": csrf,
        "success": True
    }
    response = JsonResponse(msg, status=200)

    return response

def return_404(request):
    return JsonResponse({"msg": "ERROR 404: Resource not Found!", "success": False}, status=404)


# Deprecated


IDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
       "BR",
       "சூரி", "சந்", "செவ்", "புத", "குரு", "சுக்", "சனி", "ராகு", "கேது"
       ]
Inputs = ['LAG', 'Deg', 'Min', 'Sec']
Columns = Inputs + ['DecimalDeg',
                    '1', 'DecimalDeg - 1', 'RA - 1', 'NA - 1', 'UA - 1',
                    '5', 'DecimalDeg - 5', 'RA - 5', 'NA - 5', 'UA - 5',
                    '7', 'DecimalDeg - 7', 'RA - 7', 'NA - 7', 'UA - 7',
                    '9', 'DecimalDeg - 9', 'RA - 9', 'NA - 9', 'UA - 9',
                    ]


def star_aspect(req):
    template = "star_aspect_home.html"
    data = start_aspects_init()
    print("DATA:",data)
    context = {
        "IDs": IDs,
        "data": data,

    }
    return render(req, template, context)


def calc_star_aspects(req):
    data = calculate_decimal_degree(req)
    #print("data:", data)
    print("DATA:", data)
    template = "star_aspect_home.html"
    context = {
        "data": data,
        "isCalculated": True,
    }
    return render(req, template, context)


def start_aspects_init():
    data = {}

    for i in IDs:
        set = {}
        for j in Columns:
            set[j] = 0
        data[i]=set
    return data

def calculate_decimal_degree(req):
    ddSet = {}
    for i in IDs:
        set = {}
        print("Current:", i)
        if str(i) == "BR":
            for j in Inputs:
                set[j] = ""
            continue
        else:
            for j in Inputs:
                set[j] = req.POST[j + str(i)]
        LAG = int(set['LAG'])
        Deg = int(set['Deg'])
        Min = int(set['Min'])
        Sec = int(set['Sec'])
        DegreeDeg = ((LAG - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
        set['DecimalDeg'] = str(round(DegreeDeg if DegreeDeg <= 360 else DegreeDeg - 360, 2))
        DDOne = round(DegreeDeg if DegreeDeg <= 360 else DegreeDeg - 360, 2)
        one = i if i <= 12 else i - 12
        set['1'] = str(one)
        set['DecimalDeg - 1'] = str(DDOne)
        pmz_ls = fetch_pzm(DDOne)
        set['RA - 1'] = pmz_ls.RA
        set['NA - 1'] = pmz_ls.NA
        set['UA - 1'] = pmz_ls.UA
        five = i + 4 if i+4 <= 12 else (i+4) - 12
        DDFive = ((five - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
        DDFiveUp = round(DDFive if DDFive <= 360 else DDFive - 360, 2)
        set['5'] = str(five)
        set['DecimalDeg - 5'] = str(DDFiveUp)
        pmz_ls = fetch_pzm(DDFiveUp)
        set['RA - 5'] = pmz_ls.RA
        set['NA - 5'] = pmz_ls.NA
        set['UA - 5'] = pmz_ls.UA
        seven = i + 6 if i+6 <= 12 else (i+6) - 12
        DDSeven = (((seven) - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
        DDSevenUp = round(DDSeven if DDSeven <= 360 else DDSeven - 360, 2)
        set['7'] = str(seven)
        set['DecimalDeg - 7'] = str(DDSevenUp)
        pmz_ls = fetch_pzm(DDSevenUp)
        set['RA - 7'] = pmz_ls.RA
        set['NA - 7'] = pmz_ls.NA
        set['UA - 7'] = pmz_ls.UA
        nine = i + 8 if i+8 <= 12 else (i+8) - 12
        DDNine = (((nine) - 1) * 30) + (Deg) + (Min / 60) + (Sec / 3600)
        DDNineUp = round(DDNine if DDNine <= 360 else DDNine - 360, 2)
        set['9'] = (nine)
        set['DecimalDeg - 9'] = str(DDNineUp)
        pmz_ls = fetch_pzm(DDNineUp)
        set['RA - 9'] = pmz_ls.RA
        set['NA - 9'] = pmz_ls.NA
        set['UA - 9'] = pmz_ls.UA
        # print("i::", i, one, five, seven, nine)
        ddSet[str(i)]=set
    return ddSet
