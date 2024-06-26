import { FormSelection } from "../../components/client/formselection/FormSelection";

function LandingPage() {
	return (
		<div className='landing-page'>
			<FormSelection />
			<div className='landing-page__promotion'>
				<img
					src='https://cdn6.agoda.net/images/WebCampaign/wcPD2021H2/en-us/home_banner.png'
					alt=''
				/>

				<img
					src='https://cdn6.agoda.net/images/WebCampaign/wcSP20210824EUv2/en-us.png'
					alt=''
				/>
			</div>
		</div>
	);
}

export default LandingPage;
