import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
	useAccount,
	useConnect,
	useDisconnect,
	useNetwork,
	useSwitchNetwork,
} from 'wagmi';
import { SendTransaction } from '@/components/SendTransaction';
import { SignMessage } from '@/components/SignMessage';

const Index = () => {
	const { address, connector, isConnected } = useAccount();

	const { disconnect } = useDisconnect();
	const disconnectMe = () => {
		disconnect();
	};

	const { chain } = useNetwork();
	const { chains, error, isLoading, pendingChainId, switchNetwork } =
		useSwitchNetwork();

	return (
		<div>
			<ConnectButton showBalance={false} />
			<hr />
			{isConnected && (
				<div>
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
						<button
							disabled={!switchNetwork || x.id === chain?.id}
							key={x.id}
							onClick={() => switchNetwork?.(x.id)}
						>
							{x.name}
							{isLoading && pendingChainId === x.id && ' (switching)'}
						</button>
					))}

					<div>{error && error.message}</div>
					<div>Connected to {connector?.name}</div>
					<button onClick={disconnectMe}>Disconnect</button>
					<hr />
					<SendTransaction />
					<hr />
					<SignMessage />
				</div>
			)}
		</div>
	);
};

export default Index;
