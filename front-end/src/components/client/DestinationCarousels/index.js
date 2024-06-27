import TopDestination from "./TopDestination";
import TopHighlights from "./TopHighlights";
import TopComment from "./TopComment";

export const DestinationCarousels = () => {
	return (
		<div className='destination-carousels-landing'>
			<div className='destination-carousels-landing__top-destination'>
				<TopDestination />
			</div>

			<div className='destination-carousels-landing__top-comments'>
				<TopComment />
			</div>
			<div className='destination-carousels-landing__top-highlights'>
				<TopHighlights />
			</div>
		</div>
	);
};
