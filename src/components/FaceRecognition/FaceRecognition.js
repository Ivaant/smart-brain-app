import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {

	let boxesMarkup, faceDetectionMessage;
	if (boxes.length > 0) {
		faceDetectionMessage = `${boxes.length} faces detected.`;

		boxesMarkup = boxes.map((box, i) => {
			return (
				<div key={i} className='bounding-box'
					style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
				</div>
			)
		});
	}

	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' src={imageUrl} alt='' width='700px' height='auto' />
				{boxesMarkup}
				<div className='white fw-4 f3 lh-copy'>
					{faceDetectionMessage}
				</div>
			</div>
		</div>
	);
}

export default FaceRecognition;