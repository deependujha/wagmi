import * as React from 'react';
import { useSignMessage } from 'wagmi';
import { verifyMessage } from 'ethers/lib/utils';

export function SignMessage() {
	const recoveredAddress = React.useRef<string>();
	const { data, error, isLoading, signMessage } = useSignMessage({
		onSuccess(data, variables) {
			// Verify signature when sign message succeeds
			const address = verifyMessage(variables.message, data);
			recoveredAddress.current = address;
		},
	});

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				const formData = new FormData(event.target as HTMLFormElement);
				const message = formData.get('message') as string;
				signMessage({ message });
			}}
		>
			<div className="font-bold text-2xl text-green-700 underline text-center my-3">
				Sign & verify a message
			</div>
			<label htmlFor="message">Enter a message to sign</label>
			<div />
			<textarea
				id="message"
				name="message"
				placeholder="The quick brown fox…"
				style={{ border: '2px solid black' }}
			/>
			<div />
			<button
				disabled={isLoading}
				style={{ borderRadius: '15px' }}
				className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 px-5 text-white font-bold"
			>
				{isLoading ? 'Check Wallet' : 'Sign Message'}
			</button>

			{data && (
				<div>
					<div>Recovered Address: {recoveredAddress.current}</div>
					<div>Signature: {data}</div>
				</div>
			)}

			{error && <div>{error.message}</div>}
		</form>
	);
}
