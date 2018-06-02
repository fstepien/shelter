Shelter
=======

[https://shelter.filipstepien.com/](https://shelter.filipstepien.com/)

This project was initiated by [Jessica Walker](https://jessicawalkeruxdesign.com/about/), UX Designer, and on focused solving a communication problem within the shelter network. Below is a technical description of an app providing real time shelter availability information that works within the larger scope of the project. "Shelter Watch" draws on Neighbour Watch’s idea of empowering the community to take action. The app empowers emergency shelter users with cell phone access by directly providing shelter status information. Users without cell phone access can identify partner locations through recognizable signs and can ask for information at these sites. [ :page_facing_up: For further details, the UX design description is available in PDF format. ](https://jessicawalkeruxdesign.files.wordpress.com/2018/05/improving-emergency-shelter-systems-for-the-homeless.pdf)


#### Data Flow 

![](https://meta.shippingdocuments.ca/shelter.svg)


#### Views

The website has a Public View, Operations and Admin view. As shown above the public only receives information from firebase, while the Operations can update the capacity. 

![](https://meta.shippingdocuments.ca/shelter.gif)

#### react-google-maps markers and display windows

[react-google-maps](https://tomchentw.github.io/react-google-maps/#usage--configuration) provides "a set of React components wrapping the underlying Google Maps JavaScript API v3 instances". It is well documented and provides many examples: it shows code to display a single info window and toggle open/close within a HOC. Extrapolating this to multiple markers ends up open and closing all of them at once. In this project I wanted to open the InfoBoxes individually and also have hold the information of the active location within a parent component. To solve this active states were stored in App.js and an event handler was passed down to the map component. My solution can be found at:

[My StackOverflow Answer to solve single InfoWindow display toggle](https://stackoverflow.com/a/50427200/9160384)

#### Location Information

Availability is only displayed if it has been updated within 16 hours, information such as address, hours, eligibility, phone, website are only displayed when available. This is also the case for the pie chart. 

```
          {currentLocation.time > Date.now() - 57600000 && (
            <span className="location-info-value">
                ...
              </span>
            </p>
          )}
```



#### Location Filtering

Locations are filtered twice before they are rendered onto the page: 

First, filtering the eligbility array from the data against the object that holds check box filter information:

```
    let eligibilityFiltered = Object.values(this.state.filter).every(
      value => value === false
    )
      ? this.props.locations
      : this.props.locations.filter(location => {
          return location.eligibility.some(
            item => this.state.filter[item.replace(/ .*/, "")]
          );
        });
```
Note: The regex is used as to extract first word from string.

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

#### Firebase Database Rules

There is a branch with user login intended for Admin and Operation views but for demonstration purposes no login is required. All data is is read only, with the exception of OCCUPANCY and time stamp fields. 

```
{
"rules": {
  ".read": true,
  "locations": {
    ""OCCUPANCY": {
      ".write": true
      },
  "time": {
      ".write": true
      },
  "updated": {
      ".write": true
      },     
  "$other": {
      ".write": false
      }
    }
  }
  }
}
```


#### Lessons Learned

+ A web application was chosen for quick access without requiring downloading a mobile app. It was built in React and can be easily transitioned into React Native in the future. 
+ The UX design scope included a pie chart. I decided to try [Chart.js](https://www.chartjs.org/) as it looked like an easy to use library, and worked well with React. It proved to be very quick to implement and easy to modify. However, it renders out as a Canvas which is pixel based and can be tricky scale. In previous projects I used [d3.js](https://d3js.org/) that renders an SVG that was provided better responsive scaling. For future versions of this site, d3.js should be considered. Read more about d3.js responsive scaling in my [case study](https://github.com/fstepien/scamper) or [medium post](https://medium.com/@filip.stepien/how-to-scale-a-d3-js-svg-tree-diagram-a7e89b9eebff) + Would like to explore further lifecycle management to reduce API calls/map reloading on filtering and InfoWindow display. 
 + In addition to wireframing, drawing out a data flow at the beginning of the project to create an organizational road map. At first, I sketched a data flow diagram on paper, after building initial components and checking that this flow will work I used Visio to draw the process shown above. 

 ![](https://meta.filipstepien.com/shelter.notes.jpg)