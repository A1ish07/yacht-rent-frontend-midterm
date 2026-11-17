# YachtRent - Web Technologies Final Project

YachtRent is a yacht rental website developed for the Web Technologies course at Astana IT University.

Users can browse yachts, compare prices, explore destinations, check weather conditions and calculate booking costs.

Team Members

Alexandr Kolpakov
- Booking form validation
- Booking draft saving and restoring with localStorage
- Advanced price filtering
- Optional booking services calculator
- Destination filtering
- jQuery effects and form interactions

Alisher Alimbayev
- Yacht catalog and comparison table
- Favorites and dark mode
- Weather API integration
- Yacht class (OOP)
- Yacht statistics
- API error handling

Technologies

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- jQuery
- Fetch API
- Open-Meteo API
- localStorage
- Git and GitHub

Final Project Features

1. Booking Draft

The booking form saves the selected yacht, rental duration and optional services in localStorage.

Saved information is restored after refreshing the page. Users can also clear the saved booking.

Files: `contact.html`, `js/validation.js`

2. Advanced Price Filtering

Users can filter yachts by minimum and maximum daily price.

The filters work together with yacht search, type filtering and sorting. A Reset Filters button clears all selected filters.

Files: `yachts.html`, `js/yachts.js`

3. Optional Booking Services

Two optional services were added to the booking form:

- Captain: $200/day
- Catering: $100/day

The total is calculated using:

`Total = (Yacht Price + Services) * Days`

The price updates when the selected yacht, rental duration or optional services change.

Files: `contact.html`, `js/validation.js`

4. Weather API

Current weather data is loaded from Open-Meteo using `fetch()` and `async/await`.

The Destinations page displays temperature, weather conditions and wind speed.

Loading messages, error handling and a Refresh button are included.

Files: `destinations.html`, `js/weather.js`, `js/data.js`

API: https://open-meteo.com/

5. Yacht Class

A JavaScript `Yacht` class was added.

It contains yacht properties and methods for calculating rental prices, including optional services.

Main methods:
- `getDailyRate()`
- `calculateTotal()`
- `formatPrice()`
- `formatMoney()`
- `getStats()`

Yacht objects are created from the existing dataset and used throughout the website.

Files: `js/yacht.js`, `js/data.js`

6. Yacht Statistics

The Yachts page displays:
- Number of yachts
- Average daily price
- Cheapest yacht

Statistics are calculated from the yacht data and updated when filters change.

Files: `yachts.html`, `js/yachts.js`, `js/yacht.js`

Other Features

Features from previous project stages:

- Responsive layout
- Yacht search and sorting
- Favorites with localStorage
- Yacht comparison table
- Destination filtering
- Form validation
- Dark mode
- FAQ accordion
- jQuery animations

Pages

| Page | Description |
|---|---|
| `index.html` | Home page |
| `yachts.html` | Yacht catalog, filters, favorites and statistics |
| `destinations.html` | Destinations and weather |
| `about.html` | About page and FAQ |
| `contact.html` | Booking form and price calculator |

Project Structure

```text
├── index.html
├── yachts.html
├── destinations.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── yacht.js
│   ├── data.js
│   ├── yachts.js
│   ├── destinations.js
│   ├── weather.js
│   ├── validation.js
│   ├── jq-effects.js
│   └── theme.js
├── images/
└── README.md
```
Booking
1. Select a yacht and enter the rental duration.
2. Enable captain or catering services.
3. Check the calculated total.
4. Refresh the page and check whether the saved values are restored.
5. Click Clear Saved Booking.

Yacht Filtering
1. Open the Yachts page.
2. Enter minimum and maximum prices.
3. Try combining price filters with search and yacht type.
4. Check the statistics.
5. Reset the filters.

Weather
1. Open the Destinations page.
2. Wait for weather information to load.
3. Click Refresh.
4. Check the error message when the API is unavailable.
Other
- Check form validation.
- Check favorites after refreshing.
- Check dark mode.
- Check the website on mobile.
- Check the browser console for errors.

Live Website

https://a1ish07.github.io/yacht-rent-frontend-midterm/

GitHub Repository

https://github.com/A1ish07/yacht-rent-frontend-midterm


Team:
- Alexandr Kolpakov
- Alisher Alimbayev
