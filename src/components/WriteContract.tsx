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
			<div>Write to contract</div>
			<input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
			<button disabled={!write} onClick={() => write?.()}>
				Write
			</button>
			{isLoading && <div>Check Wallet</div>}
			{isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
		</div>
	);
};

export default WriteContract;
