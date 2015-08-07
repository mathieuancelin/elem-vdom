const Showcase = require('./showcase');
const Elem = require('../../src/main');
const moment = require('moment');

let interval = null;

Showcase.registerTile('Function composition example', container => {
  function DateField(ctx, props) {
    return Elem.el('div', [
      Elem.el('h1', moment().format(props.format))
    ]);
  }

  function TimeField(ctx, props) {
    return Elem.el('div', [
      Elem.el('h2', moment().format(props.format))
    ]);
  }

  function GraphicalClock(ctx, props) {
    let hoursRotation = 'rotate(' + ((moment().hours() % 12) * 30) + ')';
    let minutesRotation = 'rotate(' + ((moment().minutes() % 60) * 6) + ')';
    let secondsRotation = 'rotate(' + ((moment().seconds() % 60) * 6) + ')';
    return Elem.el('div', { className: 'clock', style: { width: props.width + 'px', height: props.height + 'px' } }, [
      Elem.svg('svg', { xmlns: Elem.svgNS, version: '1.1', viewBox: '0 0 100 100'}, [
        Elem.svg('g', { transform: 'translate(50,50)' }, [
          Elem.svg('circle', { className: 'clock-face', r: '48', fill: 'white', stroke: '#333' }),
          Elem.svg('line', { className: 'hour', y1: '2', y2: '-20', transform: hoursRotation }),
          Elem.svg('line', { className: 'minute', y1: '4', y2: '-30', transform: minutesRotation }),
          Elem.svg('g', { transform: secondsRotation }, [
            Elem.svg('line', { className: 'second', y1: '10', y2: '-38' }),
            Elem.svg('line', { className: 'second-counterweight', y1: '10', y2: '2' })
          ])
        ])
      ])
    ]);
  }

  function Clock(ctx) {
    if (interval === null) {
      interval = setInterval(ctx.refresh, 1000);
    }
    return Elem.el('div', { style: { display: 'flex' } }, [
      Elem.el('div', { style: { display: 'flex', flexDirection: 'column' } }, [
        Elem.el(DateField, { format: 'DD/MM/YYYY' }),
        Elem.el(TimeField, { format: 'HH:mm:ss' })
      ]),
      Elem.el(GraphicalClock, { width: 120, height: 120 })
    ]);
  }

  Elem.render(Clock, container);
}, () => {
  clearInterval(interval);
  interval = null;
});

Showcase.registerTile('Function composition example with "this"', container => {
  function DateField() {
    return Elem.el('div', [
      Elem.el('h1', moment().format(this.props.format))
    ]);
  }

  function TimeField() {
    return Elem.el('div', [
      Elem.el('h2', moment().format(this.props.format))
    ]);
  }

  function GraphicalClock() {
    let hoursRotation = 'rotate(' + ((moment().hours() % 12) * 30) + ')';
    let minutesRotation = 'rotate(' + ((moment().minutes() % 60) * 6) + ')';
    let secondsRotation = 'rotate(' + ((moment().seconds() % 60) * 6) + ')';
    return Elem.el('div', { className: 'clock', style: { width: this.props.width + 'px', height: this.props.height + 'px' } }, [
      Elem.svg('svg', { xmlns: Elem.svgNS, version: '1.1', viewBox: '0 0 100 100'}, [
        Elem.svg('g', { transform: 'translate(50,50)' }, [
          Elem.svg('circle', { className: 'clock-face', r: '48', fill: 'white', stroke: '#333' }),
          Elem.svg('line', { className: 'hour', y1: '2', y2: '-20', transform: hoursRotation }),
          Elem.svg('line', { className: 'minute', y1: '4', y2: '-30', transform: minutesRotation }),
          Elem.svg('g', { transform: secondsRotation }, [
            Elem.svg('line', { className: 'second', y1: '10', y2: '-38' }),
            Elem.svg('line', { className: 'second-counterweight', y1: '10', y2: '2' })
          ])
        ])
      ])
    ]);
  }

  function Clock() {
    if (interval === null) {
      interval = setInterval(this.refresh, 1000);
    }
    return Elem.el('div', { style: { display: 'flex' } }, [
      Elem.el('div', { style: { display: 'flex', flexDirection: 'column' } }, [
        Elem.el(DateField, { format: 'DD/MM/YYYY' }),
        Elem.el(TimeField, { format: 'HH:mm:ss' })
      ]),
      Elem.el(GraphicalClock, { width: 120, height: 120 })
    ]);
  }

  Elem.render(Clock, container);
}, () => {
  clearInterval(interval);
  interval = null;
});

Showcase.registerTile('Substate with function composition', container => {

  let linesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function id() {
    return Math.random().toString(15).slice(10, 20);
  }

  function displayModel(state) {
    setTimeout(() => {
      document.getElementById('statemodel').innerHTML = JSON.stringify(state, null, 2).replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>');
    }, 0);
  }

  function deleteRow(key, refresh) {
    let value = parseInt(key.replace('line-', ''), 10);
    linesArray = linesArray.filter(i => i !== value);
    refresh();
  }

  function Line() {
    return Elem.el('div', { style: { display: 'flex' } }, [
      Elem.el('button', { type: 'button', onClick: () => {
        this.setState({ value: id() });
        displayModel(this.globalState);
      } }, 'Change value'),
      Elem.el('button', { type: 'button', onClick: () => {
        deleteRow(this.props.key, this.refresh);
        displayModel(this.globalState);
      } }, 'Delete row'),
      Elem.el('div', { style: { marginLeft: '20px' } }, this.state.value)
    ]);
  }

  function Lines() {
    const lines = linesArray.map(i => Elem.el(Line, { key: `line-${i}`, initialState: { value: '--' } }));
    return Elem.el('div', [
      Elem.el('div', { display: 'flex', flexDirection: 'column' }, lines),
      Elem.el('div', { id: 'statemodel' })
    ]);
  }

  Elem.render(Lines, container);
});


Showcase.registerTile('Todo app', container => {

  function NewTask() {

    let { state, setState } = this;

    function deleteAllDone() {
      const tasks = state.tasks.filter(item => item.done === false);
      setState({ tasks: tasks });
    }

    function createNewTask() {
      let tasks = state.tasks;
      if (state.text !== '') {
        tasks.push({
          _id: `task_${Math.random().toString(15).slice(10, 20)}`,
          name: state.text,
          done: false
        });
        setState({
          tasks,
          text: ''
        });
      }
    }

    function storeName(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        createNewTask();
      } else {
        const text = e.target.value;
        setState({ text });
      }
    }

    return Elem.el('div', [
      Elem.el('div', { className: 'row' }, [
        Elem.el('form', { role: 'form' }, [
          Elem.el('div', { className: 'form-group col-md-8' }, [
            Elem.el('input', {
              ref: 'taskInput',
              onchange: storeName,
              onkeyup: storeName,
              onkeydown: storeName,
              value: state.text,
              placeholder: 'What do you have to do ?',
              type: 'text',
              className: 'form-control',
            })
          ]),
          Elem.el('div', { className: 'form-group col-md-4' }, [
            Elem.el('div', { className: 'btn-group' }, [
              Elem.el('button', { type: 'button', className: 'btn btn-success', onclick: createNewTask }, [
                Elem.el('span', { className: 'glyphicon glyphicon-floppy-saved' }, '')
              ]),
              Elem.el('button', { onclick: deleteAllDone, type: 'button', className: 'btn btn-danger' }, [
                Elem.el('span', { className: 'glyphicon glyphicon-trash' }, '')
              ])
            ])
          ])
        ])
      ])
    ]);
  }

  function TaskItem() {
    let { state, setState, props } = this;
    function flipTaskState() {
      let tasks = state.tasks.map(item => {
        if (props.task._id === item._id) {
          return {...item, done: !props.task.done};
        }
        return item;
      });
      setState({ tasks });
    }
    return Elem.el('li', { className: 'list-group-item' }, [
      Elem.el('div', { className: 'row' }, [
        Elem.el('div', { className: 'col-md-10' }, props.task.name),
        Elem.el('div', { className: 'col-md-2' }, [
          Elem.el('span', {
            onclick: flipTaskState,
            className: {
              label: true,
              labelSuccess: props.task.done,
              labelDefault: !props.task.done
            },
            style: { cursor: 'pointer' }
          }, 'Done')
        ])
      ])
    ]);
  }

  function Todo() {
    return Elem.el('div', { className: 'col-md-5' }, [
      Elem.el('h3', 'Todo List'),
      Elem.el(NewTask),
      Elem.el('ul', { className: 'list-group' }, this.state.tasks.map(task => Elem.el(TaskItem, { task } )))
    ]);
  }

  Elem.render(Todo, container, { initialState: { tasks: [{ _id: '1', name: 'yo', done: false }], text: '' } });
});
