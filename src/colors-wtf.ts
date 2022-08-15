import {
	Transfer as TransferEvent,
	ColorCreated as ColorCreatedEvent
} from '../generated/ColorsWtf/ColorsWtf'

import {
	Token, User
} from '../generated/schema'

export function handleColorCreated(event: ColorCreatedEvent): void {
	let token = new Token(event.params._id.toString());
	token.tokenId = event.params._id;
	token.rgb = event.params._rgb;
	token.name = event.params._name;
	token.html = event.params._html;
	token.createdAt = event.block.timestamp;
	token.owner = event.params._from;
	token.save()

	let user = User.load(event.params._from);
	if(!user) {
		user = new User(event.params._from);
		user.save();
	}

}

export function handleTransfer(event: TransferEvent): void {
	let token = Token.load(event.params.tokenId.toString());
	if(token) {
		token.owner = event.params.to;
		token.save();
	}
}