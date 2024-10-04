import { Chessground } from 'chessground';
import { BoardData } from './boarddata';
import { Chess } from 'chessops/chess';
import { parseFen } from 'chessops/fen';
import { parseYaml } from 'obsidian';

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

	// parse data as yaml using obsidian's frontmatter parser
	const boardData = parseYaml(data) as BoardData;
	// 'r2q2k1/1p6/p2p4/2pN1rp1/N1Pb2Q1/8/PP1B4/R6K b - - 2 25'

	const config = {
		fen: boardData?.fen
	};
	const _ground = Chessground(wrapper, config);

	// const setup = parseFen('r1bqkbnr/ppp2Qpp/2np4/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4').unwrap();
	// const pos = Chess.fromSetup(setup).unwrap();

	console.log('Chessground', _ground);
}
