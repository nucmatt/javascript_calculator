import './scss/style.scss';

function App() {
	return (
		<div className='container bg-primary'>
			<main>
				<div id='calculator'>
					<div id='display'></div>
					<div id='secondary-funcs'>
            <div className="blank"></div>
						<button id='mem-clear' className='btn'>
							MC
						</button>
						<button id='mem-recall' className='btn'>
							MR
						</button>
						<button id='mem-add' className='btn'>
							M+
						</button>
						<button id='clear-display' className='btn'>
							AC
						</button>
					</div>
					<div id='numpad'>
						<button id='open-parentheses' className='btn'>
							(
						</button>
						<button id='seven' className='btn'>
							7
						</button>
						<button id='eight' className='btn'>
							8
						</button>
						<button id='nine' className='btn'>
							9
						</button>
						<button id='divide' className='btn'>
							/
						</button>
						<button id='close-parentheses' className='btn'>
							)
						</button>
						<button id='four' className='btn'>
							4
						</button>
						<button id='five' className='btn'>
							5
						</button>
						<button id='six' className='btn'>
							6
						</button>
						<button id='multiply' className='btn'>
							*
						</button>
						<button id='exponent' className='btn'>
							y<sup>x</sup>
						</button>
						<button id='one' className='btn'>1</button>
						<button id='two' className='btn'>2</button>
						<button id='three' className='btn'>3</button>
						<button id='subtract' className='btn'>-</button>
						<button id='backspace' className='btn'>del</button>
						<button id='zero' className='btn'>0</button>
						<button id='period' className='btn'>.</button>
						<button id='equals' className='btn'>=</button>
						<button id='add' className='btn'>+</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
