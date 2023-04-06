import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ detectClick, detectUrlChange }) => {
	return (
		<div>
			<p className='f3'>
				{'This Magic Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='center form pa3 f4 br3 shadow-5 flex justify-center'>
				<input
					className='w-70 pa2 ma3' type='text'
					onChange={detectUrlChange}
				/>
				<button
					className='button w-30 ph2 pv1 white bg-light-purple'
					onClick={detectClick}>
					Detect
				</button>
			</div>
		</div>

	);
}

export default ImageLinkForm;