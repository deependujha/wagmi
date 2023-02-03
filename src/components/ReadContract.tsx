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
		onSuccess(data: string) {
			setReadValue(data);
			console.log('Success', data);
		},
	});

	return (
		<div>
			<div className="font-bold text-2xl text-green-700 underline text-center my-3">
				Read from the contract
			</div>
			<div>Read value is: {readValue}</div>
		</div>
	);
};

export default ReadContract;
