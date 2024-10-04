import { Chessground } from 'chessground';
import { Config } from 'chessground/config';
import { BoardData } from './boarddata';
// import { Chess } from 'chessops/chess';
// import { makeFen, parseFen } from 'chessops/fen';
import { parseYaml } from 'obsidian';
// import { parseSquare, parseUci } from 'chessops';
import { render } from "solid-js/web";
import { createSignal, onMount } from 'solid-js';
import { Api } from 'chessground/api';


export function createChessboard(data: string, el: HTMLElement) {
	// create a div under el and set its width and height to 100%

	let wrapper! : HTMLDivElement;

	const [api, setApi] = createSignal<Api | undefined>(undefined);

	const onClick = () => {
		const cg = api();
		if (!cg) {
			return;
		}
		cg.newPiece({
			role: 'king',
			color: 'white'
		}, 'e2');
		// log new fen
		console.log(cg.getFen());
	}


	render(() => <div class="chess-container">
		<div ref={wrapper} class="chessboard" >

		</div>
		<div>
			<button onClick={onClick} >Hit me</button>
		</div>
	</div>, el);
 





	// create a test button


	// parse data as yaml using obsidian's frontmatter parser
	const boardData = parseYaml(data) as BoardData;
	console.log(boardData);
	// 'r2q2k1/1p6/p2p4/2pN1rp1/N1Pb2Q1/8/PP1B4/R6K b - - 2 25'

	const config: Config = {
		// fen: boardData?.fen,
		fen: "8/8/8/8/8/8/8/8 w - - 0 1",
		draggable: {
			enabled: true
		},
		movable: {
			free: true,  // Allow pieces to be placed freely
			color: 'both', // Both sides can move pieces
			// events: {
			// 	after: (orig, dest, metadata) => {
			// 		console.log(this,orig, dest, metadata);

			// 	}
			// }
		},
		selectable: {
			enabled: true, // Allow pieces to be selectable

		},
		highlight: {
			lastMove: true,
			check: true,
		},

	};

	// solid-js onLoad equivalent
	onMount(async () => {
		if (!wrapper) {
			return;
		}
		const api = Chessground(wrapper, config);
		api.set({
			movable: {
				events: {
					after: (orig, dest, metadata) => {
						console.log(orig, dest, metadata);
						console.log(api.getFen());
					}
				}
			}
		});
		setApi(api);
	});






	// api.newPiece(WhitePawn, 'e2');
	// const setup = parseFen('r1bqkbnr/ppp2Qpp/2np4/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4').unwrap();
	// const pos = Chess.fromSetup(setup).unwrap();

	// Function to add a piece to the board
	// function addPiece(square: string, piece: string) {
	// 	chessboard.set({
	// 		fen: updateFen(chessboard, square, piece)
	// 	});
	// }

	// // Function to remove a piece from the board
	// function removePiece(square: string) {
	// 	chessboard.set({
	// 		fen: updateFen(chessboard, square, null)
	// 	});
	// }

	// Helper function to update the FEN string
	// function updateFen(board: Api, square: string, piece: string | null): string {
	// 	// update fen using chessops
	// 	const fen = board.getFen();
	// 	const setup = parseFen(fen).unwrap();
	// 	const sq = parseSquare(square);
	// 	setup.board.set(sq, piece);		
	// 	// return the new fen from the updated setup
	// 	return makeFen(setup);

	// }
}

