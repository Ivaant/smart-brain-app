import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({detectClick, detectUrlChange}) => {
	return(
		<div>
			<p className='f3'>
				{'This Magic Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='center form pa3 f4 br3 shadow-5'>
				<input 
					className='w-70 pa2 ma3' type='text'
					onChange={detectUrlChange} 
				/>
				<button 
					className='w-30 grow link ph2 pv1 dib white bg-light-purple'
					onClick={detectClick}>
					Detect
				</button>
			</div>
		</div>

		);
}

export default ImageLinkForm;