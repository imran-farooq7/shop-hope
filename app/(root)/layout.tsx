const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<header>
				<nav>
					<ul>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/about">About</a>
						</li>
					</ul>
				</nav>
			</header>
			<main>{children}</main>
		</div>
	);
};

export default Layout;
