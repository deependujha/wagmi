import ABI from '@/constants/ABI';
import DeployedAddress from '@/constants/DeployedAddress';
import React, { useState } from 'react';
import { useContractRead } from 'wagmi';

const ReadContract = () => {
	const [readValue, setReadValue] = useState('');
	const { data, isError, isLoading } = useContractRead({
		address: DeployedAddress,
		abi: ABI,
		functionName: 'get',
		watch: true, // Watches and refreshes data for new blocks.
		onError(error) {
			console.log('Error', error);
		},
		onSuccess(data) {
			console.log('Success', data);
		},
	});

	return (
		<div>
			<button onClick={() => {}}>Read from the contract</button>
			<div>Read value is: {readValue}</div>
		</div>
	);
};

export default ReadContract;
