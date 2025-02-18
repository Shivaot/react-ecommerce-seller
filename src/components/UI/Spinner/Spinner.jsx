import React from "react";

const Spinner = () => {
	return (
		<div>
			<div className="spinner-border text-primary" style={{width: "10rem", height: "10rem"}} role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};

export default Spinner;
