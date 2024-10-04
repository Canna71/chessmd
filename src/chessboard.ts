import { Chessground } from 'chessground';
import { Config } from 'chessground/config';
import { BoardData } from './boarddata';
import { Chess } from 'chessops/chess';
import { makeFen, parseFen } from 'chessops/fen';
import { parseYaml } from 'obsidian';
import { parseSquare, parseUci } from 'chessops';

export function createChessboard(data: string, el: HTMLElement) {
	// create a div under el and set its width and height to 100%
	const board = document.createElement('div');
	board.style.width = '100%';
	board.style.height = '100%';
	board.style.position = 'relative';
	// board.style.display = 'table';
	el.appendChild(board);

	const wrapper = document.createElement('div');
	wrapper.style.width = '100%';
	wrapper.style.height = '100%';
	wrapper.style.display = 'table';
	wrapper.style.paddingBottom = '100%';
	// wrapper.style.position = 'absolute';
	board.appendChild(wrapper);

	// create a test button
	

	// parse data as yaml using obsidian's frontmatter parser
	const boardData = parseYaml(data) as BoardData;
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
		},
		selectable: {
			enabled: true, // Allow pieces to be selectable
			
		},
		highlight: {
			lastMove: true,
			check: true,
		},
	};
	const api = Chessground(wrapper, config);


	const button = document.createElement('button');
	button.textContent = 'Click me';
	button.onclick = () => { 
		// https://github.com/victorocna/next-chessground/blob/master/components/EditorPieces.jsx

		api.newPiece({
			role: 'king',
			color: 'white'
		}, 'e2');
	};
	el.appendChild(button);

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

