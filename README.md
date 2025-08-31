# Profiling

## Before optimisation:

#### Columns Selecting
Interaction: Adding cement_co2 column by clicking on a checkbox
Commit Duration: 1.9s
Render Duration: 259.7ms
![Chart](/docs/profiling/addingColumns/addingColumnChartBefore.png)
![Flame](/docs/profiling/addingColumns/addingColumnFlameBefore.png)

#### Columns Removing
Interaction: Removing cement_co2 column by clicking on a checkbox
Commit Duration: 2s
Render Duration: 293.5ms
![Chart](/docs/profiling/removingColumns/removingColumnsChartBefore.png)
![Flame](/docs/profiling/removingColumns/removingColumnsFlameBefore.png)

#### Selecting another year
Interaction: Selecting year 2020 after clicking on a button
Commit Duration: 1.8s
Render Duration: 248.5ms
![Chart](/docs/profiling/year/yearChartBefore.png)
![Flame](/docs/profiling/year/yearFlameBefore.png)

#### Searching a country
Interaction: Searching for Australia country after clicking on a button
Commit Duration: 1s
Render Duration: 7.4ms
![Chart](/docs/profiling/country/countryChartBefore.png)
![Flame](/docs/profiling/country/countryFlameBefore.png)

#### Sorting a column
Interaction: Sorting a column by population (desc), after choosing an option
Commit Duration: 1.7s
Render Duration: 285.5ms
![Chart](/docs/profiling/sorting/sortingChartBefore.png)
![Flame](/docs/profiling/sorting/sortingFlameBefore.png)
