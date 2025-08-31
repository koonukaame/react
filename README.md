# Profiling

## Columns Selecting

#### Before optimisation
* Interaction: Adding cement_co2 column by clicking on a checkbox
* Commit Duration: 1.9s
* Render Duration: 259.7ms
![Chart](/docs/profiling/addingColumns/addingColumnChartBefore.png)
![Flame](/docs/profiling/addingColumns/addingColumnFlameBefore.png)

#### After optimisation
* Interaction: Adding cement_co2 column by clicking on a checkbox
* Commit Duration: 1.7s
* Render Duration: 312.7ms
![Chart](/docs/profiling/addingColumns/addingColumnChartAfter.png)
![Flame](/docs/profiling/addingColumns/addingColumnFlameAfter.png)

## Columns Removing

#### Before optimisation
* Interaction: Removing cement_co2 column by clicking on a checkbox
* Commit Duration: 2s
* Render Duration: 293.5ms
![Chart](/docs/profiling/removingColumns/removingColumnsChartBefore.png)
![Flame](/docs/profiling/removingColumns/removingColumnsFlameBefore.png)

#### After optimisation
* Interaction: Removing cement_co2 column by clicking on a checkbox
* Commit Duration: 1.3s
* Render Duration: 317ms
![Chart](/docs/profiling/removingColumns/removingColumnsChartAfter.png)
![Flame](/docs/profiling/removingColumns/removingColumnsFlameAfter.png)

## Selecting another year

#### Before optimisation
* Interaction: Selecting year 2020 by clicking on a button
* Commit Duration: 1.8s
* Render Duration: 248.5ms
![Chart](/docs/profiling/year/yearChartBefore.png)
![Flame](/docs/profiling/year/yearFlameBefore.png)

#### After optimisation
* Interaction: Selecting year 2020 by clicking on a button
* Commit Duration: 1.3s
* Render Duration: 262.3ms
![Chart](/docs/profiling/year/yearChartAfter.png)
![Flame](/docs/profiling/year/yearFlameAfter.png)

## Searching a country

#### Before optimisation
* Interaction: Searching for Australia country by clicking on a button
* Commit Duration: 1s
* Render Duration: 7.4ms
![Chart](/docs/profiling/country/countryChartBefore.png)
![Flame](/docs/profiling/country/countryFlameBefore.png)

#### After optimisation
* Interaction: Searching for Australia country by clicking on a button
* Commit Duration: 0.8s
* Render Duration: 11.6ms
![Chart](/docs/profiling/country/countryChartAfter.png)
![Flame](/docs/profiling/country/countryFlameAfter.png)

## Sorting a column

#### Before optimisation
* Interaction: Sorting a column by population (desc), after choosing an option
* Commit Duration: 1.7s
* Render Duration: 285.5ms
![Chart](/docs/profiling/sorting/sortingChartBefore.png)
![Flame](/docs/profiling/sorting/sortingFlameBefore.png)

#### After optimisation
* Interaction: Sorting a column by population (desc), after choosing an option
* Commit Duration: 1.3s
* Render Duration: 306.2ms
![Chart](/docs/profiling/sorting/sortingChartAfter.png)
![Flame](/docs/profiling/sorting/sortingFlameAfter.png)