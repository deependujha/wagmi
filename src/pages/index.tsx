import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi';
import { SendTransaction } from '@/components/SendTransaction';

const Index = () => {
	const { address, connector, isConnected } = useAccount();
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect();
	const { disconnect } = useDisconnect();
	const disconnectMe = () => {
		disconnect();
	};

	const { chain, chains } = useNetwork();

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
					<div>Connected to {connector?.name}</div>
					<button onClick={disconnectMe}>Disconnect</button>
					<hr />
					<SendTransaction />
				</div>
			)}
		</div>
	);
};

export default Index;
