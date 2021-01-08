from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

from astrology.models import PlanetZodiacMap

# Create your views here.

IDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
Inputs = ['LAG', 'Deg', 'Min', 'Sec']
Columns = Inputs + ['DecimalDeg', '1', 'DecimalDeg - 1', '5', 'DecimalDeg - 5', '7', 'DecimalDeg - 7', '9',
                    'DecimalDeg - 9']


def star_aspect(req):
    template = "star_aspect_home.html"
    context = {
        "IDs": IDs,

    }
    return render(req, template, context)


def calc_star_aspects(req):
    data = calculate_decimal_degree(req)
    #print("data:", data)
    template = "star_aspect_home.html"
    context = {
        "data": data,
        "isCalculated": True,
    }
    return render(req, template, context)


def calculate_decimal_degree(req):
    ddSet = {}
    for i in IDs:
        set = {}
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


def fetch_pzm(DD):
    lower_limit = DD - 3
    upper_limit = DD + 2
    pzmdata = PlanetZodiacMap.objects.filter(DecimalDeg__lte = DD).filter(DecimalDeg__gte = lower_limit)
    print("============")
    DDList = []
    for pzm in pzmdata:
        DDList.append(pzm.DecimalDeg)
    print("PMZ:MAX:", DDList, DD, max(DDList))
    pzm = pzmdata.get(DecimalDeg = max(DDList))
    print("Final PMZ::", pzm.id, pzm.DecimalDeg, DD)
    return pzm