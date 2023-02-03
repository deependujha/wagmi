import * as React from 'react';
import { useDebounce } from 'use-debounce';
import {
	usePrepareSendTransaction,
	useSendTransaction,
	useWaitForTransaction,
} from 'wagmi';
import { parseEther } from '@ethersproject/units';

export function SendTransaction() {
	const [to, setTo] = React.useState('');
	const [debouncedTo] = useDebounce(to, 500);

	const [amount, setAmount] = React.useState('');
	const [debouncedAmount] = useDebounce(amount, 500);

	const { config } = usePrepareSendTransaction({
		request: {
			to: debouncedTo,
			value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
		},
	});
	const { data, sendTransaction } = useSendTransaction(config);

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				sendTransaction?.();
			}}
		>
			<div className="font-bold text-2xl text-green-700 underline text-center my-3">
				Send transcation
			</div>
			<input
				style={{ border: '2px solid black' }}
				aria-label="Recipient"
				onChange={(e) => setTo(e.target.value)}
				placeholder="0xA0Cf…251e"
				value={to}
			/>
			<div />
			<input
				style={{ border: '2px solid black' }}
				aria-label="Amount (ether)"
				onChange={(e) => setAmount(e.target.value)}
				placeholder="0.05"
				value={amount}
			/>
			<div />
			<button
				disabled={isLoading || !sendTransaction || !to || !amount}
				style={{ borderRadius: '15px' }}
				className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 px-5 text-white font-bold"
			>
				{isLoading ? 'Sending...' : 'Send'}
			</button>
			{isSuccess && (
				<div>
					Successfully sent {amount} ether to {to}
					<div>
						<a
							href={`https://goerli.etherscan.io/tx/${data?.hash}`}
							target="_blank"
							rel="noreferrer"
						>
							Etherscan
						</a>
					</div>
				</div>
			)}
		</form>
	);
}
