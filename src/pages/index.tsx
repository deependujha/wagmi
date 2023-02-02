import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const Index = () => {
	const { address, connector, isConnected } = useAccount();
	const { connect, connectors, error,isLoading, pendingConnector } = useConnect();
	const { disconnect } = useDisconnect();
	const disconnectMe = () => {
		disconnect();
	};
	
	return (
		<div>
			<ConnectButton showBalance={false} />
			<hr />
			{isConnected && (
				<div>
					{/* <img src={ensAvatar} alt="ENS Avatar" /> */}
					<div>Your address is: {address}</div>
					<div>Connected to {connector?.name}</div>
					<button onClick={disconnectMe}>Disconnect</button>
				</div>

			)}
		</div>
	);
};

export default Index;
