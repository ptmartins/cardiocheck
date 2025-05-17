(function() {

    /**
     * DOM object
     */
    let DOM = {};

    let ctx = document.querySelector('.chart');

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let datasetMonths = [];

    let labels = [];

    let datasets = [
      {
        label: 'Systolic',
        data: [],
        borderColor: 'red',
        backgroundColor: 'red'
      },
      {
        label: 'Diastolic',
        data: [],
        borderColor: 'blue',
        backgroundColor: 'blue'
      }
    ];

    /**
     * Caches DOM elements
     */
    let cacheDOM = () => {
        DOM.error = document.querySelector('.error');
        DOM.datePicker = document.querySelector('.form__field--date .form__input');
        DOM.mobileToggle = document.querySelector('.mobileNav__toggle');
        DOM.mobileNavList = document.querySelector('.mobileNav__list');
        DOM.mobileNav = document.querySelector('.mobileNav');
        DOM.nav = document.querySelector('.nav');
        DOM.navItems = document.querySelectorAll('.nav__item');
        DOM.chartActions = document.querySelector('.chart__actions');
    };

    /**
     * Attaches Flatpickr to inputs of type date
     */
    let attachDatePicker = () => {
        if(DOM.datePicker) {
            flatpickr(DOM.datePicker, {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                maxDate: new Date()
            });
        }
    };

    /**
     * Toogle mobile nav menu list
     */
    let toggleMobileNav = () => {
        DOM.mobileNavList.classList.toggle('isHidden');
    }

    /**
     * Handles the behaviour of the mobile menu
     */
    let handleMobileNav = () => {
        let { display } = window.getComputedStyle(DOM.mobileNav);
        let isMobile = display !== 'none';

        if(isMobile) {
            DOM.mobileToggle.addEventListener('click', toggleMobileNav);
        }
    }

    let callApi = async (url, method = 'GET', body = null) => {
        try {
            let options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            let response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    let filterByMonth = () => {
      console.log('Filter by month');
    }

    /**
     * 
     */
    let setChartFilters = () => {

      let btn = document.createElement('BUTTON');
      btn.className = 'btn';
      btn.textContent = 'All';

      DOM.chartActions.appendChild(btn);

      datasetMonths.forEach(month => {
        let btn = document.createElement('BUTTON');
        btn.className = 'btn';
        btn.textContent = `${month}.25`;

        btn.addEventListener('click', filterByMonth);

        DOM.chartActions.appendChild(btn);
      })
    }

    /**s
     * Creates datasets for chart
     * @param {*} data 
     */
    let createDatasets = data => {

      data.forEach(item => {

        let itemDate = new Date(item.dateTime);

        labels.push(itemDate.toUTCString());

        if(!datasetMonths.includes(months[itemDate.getMonth()])) {
          datasetMonths.push(months[itemDate.getMonth()]);
        }
      
        datasets[0].data.push(item.sys);
        datasets[1].data.push(item.dia);
      })
    }

    let plotChart = data => {

      createDatasets(data);
      setChartFilters();

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          scales: {
            x: {
              display: true,
              min: '2025-04-10 00:00:00',
              type: 'time',
              time: {
                unit: 'week'
              }
            },
            y: {
              min: 50,
              max: 190
            }
          },
          plugins: {
            annotation: {
              annotations: {
                line1: {
                  type: 'line',
                  yMin: 140,
                  yMax: 140,
                  borderColor: 'rgb(255, 99, 132)',
                  borderWidth: 2
                },
                line2: {
                  type: 'line',
                  yMin: 90,
                  yMax: 90,
                  borderColor: 'rgb(99, 193, 255)',
                  borderWidth: 2
                }
              }
            }
          }
        }
      })
    }


    let setupChart = async () => {
        debugger;
        let data = await callApi('/api', 'GET');
        plotChart(data);
    }

    /**
     * Handles current menu
     */
    let handleMenu = () => {
        let locationPath = window.location.pathname === '/' ? '/dashboard' : window.location.pathname;
        let location = locationPath.split('/').length > 2 ? locationPath.split('/')[locationPath.length - 1] : locationPath.split('/')[1];

        DOM.navItems.forEach(item => {
            let path = item.dataset.path;
            if(path === location) {
                item.classList.add('current');
            }
        });

        if(location === 'charts') {
            setupChart();
        }
    };

    /**
     * Quicks-off the logic
     */
    let init = () => {
        cacheDOM();
        attachDatePicker();
        handleMobileNav();
        handleMenu();

        if(DOM.error) {
            let goBack = document.querySelector('.goBack');

            goBack.addEventListener('click', ev => {
                ev.preventDefault();
                window.history.back();
            });
        }
    };

    window.addEventListener("DOMContentLoaded", init);
    window.addEventListener('resize', handleMobileNav);
    window.addEventListener('hashchange', handleMenu);

})()