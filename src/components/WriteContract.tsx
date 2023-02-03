import ABI from '@/constants/ABI';
import DeployedAddress from '@/constants/DeployedAddress';
import React, { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

const WriteContract = () => {
	const [newValue, setNewValue] = useState('');

	const { config } = usePrepareContractWrite({
		address: DeployedAddress,
		abi: ABI,
		functionName: 'setGreeting',
		args: [newValue],
	});
	const { data, isLoading, isSuccess, write } = useContractWrite(config);
	return (
		<div>
			<div className="font-bold text-2xl text-green-700 underline text-center my-3">
				Write to the contract
			</div>
			<input
				value={newValue}
				onChange={(e) => setNewValue(e.target.value)}
				style={{ border: '2px solid black' }}
			/>
			<div />
			<button
				disabled={!write}
				onClick={() => write?.()}
				style={{ borderRadius: '15px' }}
				className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 px-5 text-white font-bold"
			>
				Write
			</button>
			{isLoading && <div>Check Wallet</div>}
			{isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
		</div>
	);
};

export default WriteContract;
