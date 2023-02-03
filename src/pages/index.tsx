import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
	useAccount,
	useConnect,
	useDisconnect,
	useNetwork,
	useSwitchNetwork,
	useBalance,
} from 'wagmi';
import { SendTransaction } from '@/components/SendTransaction';
import { SignMessage } from '@/components/SignMessage';
import ReadContract from '@/components/ReadContract';
import WriteContract from '@/components/WriteContract';

const Index = () => {
	const { address, connector, isConnected } = useAccount();

	const { disconnect } = useDisconnect();
	const disconnectMe = () => {
		disconnect();
	};

	const { chain } = useNetwork();
	const { chains, error, isLoading, pendingChainId, switchNetwork } =
		useSwitchNetwork();

	const { data } = useBalance({
		address,
	});

	return (
		<div className="mx-4 my-4 ">
			<ConnectButton showBalance={true} />
			<hr
				className="my-6"
				style={{
					borderWidth: '2px',
					borderColor: 'red',
				}}
			/>
			{isConnected && (
				<div>
					<div className="font-bold text-2xl text-green-700 underline text-center my-3">
						Connected. Thanks to Rainbow-kit & Wagmi
					</div>
					{/* <img src={ensAvatar} alt="ENS Avatar" /> */}
					<div>Your address is: {address}</div>
					{chain && <div>Connected to {chain.name}</div>}
					{chains && (
						<div>
							Available chains:{' '}
							{chains.map((chain, idx) => (
								<div key={idx} style={{ color: 'blue' }}>
									{chain.name}
								</div>
							))}
						</div>
					)}
					{chains.map((x) => (
						<div key={x.id}>
							<button
								style={{ borderRadius: '15px' }}
								className={`${
									!switchNetwork || x.id === chain?.id
										? ' bg-gray-500'
										: 'bg-pink-500'
								} py-3 px-5 text-white font-bold my-3`}
								disabled={!switchNetwork || x.id === chain?.id}
								onClick={() => switchNetwork?.(x.id)}
							>
								{x.name}
								{isLoading && pendingChainId === x.id && ' (switching)'}
							</button>
						</div>
					))}

					<div>{error && error.message}</div>
					<div>Connected to {connector?.name}</div>
					<div>{`Your balance is: ${data?.formatted} ${data?.symbol}`}</div>
					<button
						onClick={disconnectMe}
						style={{ borderRadius: '15px' }}
						className="bg-red-600 py-3 px-5 text-white font-bold"
					>
						Disconnect
					</button>
					<hr
						className="my-6"
						style={{
							borderWidth: '2px',
							borderColor: 'blue',
						}}
					/>
					<SendTransaction />
					<hr
						className="my-6"
						style={{
							borderWidth: '2px',
							borderColor: 'green',
						}}
					/>
					<SignMessage />
					<hr
						className="my-6"
						style={{
							borderWidth: '2px',
							borderColor: 'yellow',
						}}
					/>
					<ReadContract />
					<hr
						className="my-6"
						style={{
							borderWidth: '2px',
							borderColor: 'purple',
						}}
					/>
					<WriteContract />
				</div>
			)}
		</div>
	);
};

export default Index;
