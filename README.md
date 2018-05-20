Shelter
=======


#### Location Filtering

Locations are filtered twice before they are rendered onto the page: 

First, filtering the eligbility array from the data against the object that holds check box filter information: 

```
    let eligibilityFiltered = Object.values(this.state.filter).every(
      value => value === false
    )
      ? this.props.locations
      : this.props.locations.filter(location => {
          return location.eligibility.some(item => this.state.filter[item]);
        });
```

Secondly, a check is made to see if any of the text in the search bar matches location.orgName: 

```
    let filteredLocations = eligibilityFiltered.filter(location => {
      return (
        location.orgName
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
```


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