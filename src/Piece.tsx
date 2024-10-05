import { Role } from 'chessground/types';


// const roles is all values of Role type, using typescript

export const ROLES: Role[] = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];

// export a Piece solid-js component that takes a role and color prop and renders a piece
// with the appropriate class name

export const Piece = (props: { role: Role, color: 'white' | 'black' }) => {
	return <piece class={`${props.color} ${props.role}`} style="height:50px;width:50px;position:relative;display:block;"></piece>
}

// export a toolbar control that lists all the pieces in ROLES and allows the user to select
// a piece to add to the board


export const Toolbar = (props: { onPieceSelected: (role: Role) => void }) => {
	return <div class="cg-wrap">
		{ROLES.map(role => <button onClick={() => props.onPieceSelected(role)}>
			<Piece role={role} color="white" />
		</button>)}
	</div>
}
