Shelter
=======

#### Transit Marker

Map has transit markers turned on using `options={styles: mapStyles}` with maStyles containing the following

```
{
        "featureType": "transit.station",
        "elementType": "labels.icon",
        "stylers": [
            {
                "gamma": 1
            },
            {
                "saturation": 50
            }
        ]
    }
```