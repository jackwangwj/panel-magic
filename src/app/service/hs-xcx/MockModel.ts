// 模拟页面数据
export const MockModel = {
	app_id: '1e8ecb01c66bef0',
	cata_data: [
		{
			group: '默认组',
			pages: [
				{
					title: '首页',
					name: '首页',
					router: 'page10000',
					isEdit: false,
					uniqueId: 1544003845315
				},
				{
					title: '第二页',
					name: '第二页',
					router: 'page10001',
					isEdit: false,
					uniqueId: 1544004063948
				}
			],
			isEdit: false,
			uniqueId: 1544003845292
		}
	],
	app_data: {
		page10000: {
			router: 'page10000',
			eles: [
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							color: '#333',
							height: '30px',
							width: '128px',
							opacity: '1',
							'font-size': '22px',
							'text-align': 'left',
							'border-style': 'none',
							'line-height': '30px',
							transform: 'rotate(0deg)',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							'background-color': 'transparent',
							'border-color': null,
							'border-width': '0px',
							'border-radius': '0px 0px 0px 0px',
							'box-shadow': '0px 0px 0px 0px #000'
						},
						children: []
					},
					content: '我是文本',
					type: 'text',
					orientationmodel: {
						width: 128,
						height: 30,
						left: 149.00000000000003,
						top: 17,
						zIndex: 2,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '395px',
							height: '10px',
							'line-height': '10px',
							opacity: '1',
							transform: 'rotate(0deg)',
							'font-size': '12px',
							'background-color': 'transparent',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial'
						},
						children: [
							{
								data: {
									'border-top-width': '1px',
									'border-top-style': 'dashed',
									'border-top-color': '#000',
									width: '100%',
									height: '5px',
									display: 'inline-block'
								},
								children: []
							}
						]
					},
					content: { type: 3, bgColor: '#000', borderWidth: 1 },
					type: 'line',
					orientationmodel: {
						width: 395,
						height: 10,
						left: 9.5,
						top: 73.16666666666652,
						zIndex: 5,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: null, eventParams: null },
					style: {
						data: {
							width: '395px',
							height: '10px',
							'line-height': '10px',
							opacity: '1',
							transform: 'rotate(0deg)',
							'font-size': '12px',
							'background-color': 'transparent',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial'
						},
						children: [
							{
								data: {
									'border-top-width': '1px',
									'border-top-style': 'dashed',
									'border-top-color': '#000',
									width: '100%',
									height: '5px',
									display: 'inline-block'
								},
								children: []
							}
						]
					},
					content: { type: 3, bgColor: '#000', borderWidth: 1 },
					type: 'line',
					orientationmodel: {
						width: 395,
						height: 10,
						left: 9.5,
						top: 53,
						zIndex: 5,
						rotate: 0
					}
				},
				{
					customfeature: {
						eventHandler: 'tapNavigateHandler',
						eventParams: { nav_url: 'page10000' }
					},
					style: {
						data: {
							color: '#fff',
							height: '31px',
							width: '87.99999999999999px',
							'line-height': '31px',
							'background-color': '#347690',
							'border-radius': '40px 4px 40px 4px',
							opacity: '1',
							'font-size': '14px',
							'text-align': 'center',
							'border-style': 'solid',
							'border-width': '0px',
							'border-color': '#df63d7',
							transform: 'rotate(0deg)',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							'box-shadow': '1px 2px 11px -1px #3b3838'
						},
						children: []
					},
					content: '按钮',
					type: 'button',
					orientationmodel: {
						width: 87.99999999999999,
						height: 31,
						left: 9.5,
						top: 131.70833333333314,
						zIndex: 7,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '80px',
							height: '80px',
							transform: 'rotate(0deg)',
							'background-color': '',
							'border-color': '',
							'border-style': 'none',
							'border-width': '0px',
							'border-radius': '0px 0px 0px 0px',
							'line-height': '80px',
							'box-shadow': '0px 0px 0px 0px #000',
							filter:
								'blur(0px) brightness(1) contrast(1) saturate(1) grayscale(0) sepia(0) hue-rotate(0deg) invert(0)'
						},
						children: []
					},
					type: 'picture',
					orientationmodel: {
						width: 80,
						height: 80,
						left: 293,
						top: 97,
						zIndex: 8,
						rotate: 44
					}
				},
				{
					customfeature: {
						eventHandler: 'tapCallHandler',
						eventParams: { phone_num: '18676769065' }
					},
					style: {
						data: {
							width: '50px',
							height: '50px',
							left: '0px',
							top: '0px',
							'font-weight': 'normal',
							'font-style': 'normal',
							transform: 'rotate(0deg)'
						},
						children: []
					},
					content: '链接区域',
					type: 'linkrange',
					orientationmodel: {
						width: 50,
						height: 50,
						left: 28.499999999999993,
						top: 122.20833333333314,
						zIndex: 9,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '83px',
							height: '105px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '0px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#3463b1',
							'border-color': '',
							'border-radius': '0px 0px 0px 0px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '105px',
							'clip-path':
								'polygon(100% 0%, 0% 0%, 100% 100%, 100% 48.57142857142861%, 0% 44.66666666666666%)'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 83,
						height: 105,
						left: 156,
						top: 194,
						zIndex: 10,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '50px',
							height: '50px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '1px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '0px 0px 0px 0px',
							'box-shadow': '0px 0px 0px 0px #000'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 50,
						height: 50,
						left: -46,
						top: 453,
						zIndex: 11,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '50px',
							height: '50px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '1px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '0px 0px 0px 0px',
							'box-shadow': '0px 0px 0px 0px #000'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 50,
						height: 50,
						left: 12.5,
						top: 453,
						zIndex: 12,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '50px',
							height: '50px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '1px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '0px 0px 0px 0px',
							'box-shadow': '0px 0px 0px 0px #000'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 50,
						height: 50,
						left: 71,
						top: 453,
						zIndex: 13,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '50px',
							height: '50px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '1px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '0px 0px 0px 0px',
							'box-shadow': '0px 0px 0px 0px #000'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 50,
						height: 50,
						left: 129.5,
						top: 453,
						zIndex: 14,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '50px',
							height: '50px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '1px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '0px 0px 0px 0px',
							'box-shadow': '0px 0px 0px 0px #000'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 50,
						height: 50,
						left: 188,
						top: 453,
						zIndex: 15,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							'font-size': '12px',
							color: '#000',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							'text-align': 'initial',
							'line-height': '206px',
							height: '206px',
							width: '174px'
						},
						children: []
					},
					content: {
						mapModel: {
							text: '广东省深圳市',
							address: '',
							coordinates: [116.397428, 39.90923],
							height: 200,
							markers: [
								{
									latitude: 39.90923,
									longitude: 116.397428,
									name: '',
									desc: '广东省深圳市'
								}
							]
						}
					},
					type: 'map',
					orientationmodel: {
						width: 174,
						height: 206,
						left: 239,
						top: 550,
						zIndex: 16,
						rotate: 0
					}
				}
			],
			customfeature: {
				title: '首页',
				name: '首页',
				navBgColor: '#0f0b53',
				navFrontColor: '#ffffff',
				pageHeight: 778
			}
		},
		page10001: {
			router: 'page10001',
			eles: [
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '266px',
							height: '252px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '2px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#5da2f3',
							'border-color': '',
							'border-radius': '150px 150px 150px 150px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '252px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 266,
						height: 252,
						left: 114,
						top: 130,
						zIndex: 1,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '231px',
							height: '198px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '2px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '200px 200px 200px 200px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '198px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 231,
						height: 198,
						left: 131.5,
						top: 173,
						zIndex: 2,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '151px',
							height: '69px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '2px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '0px 0px 100px 100px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '69px',
							'clip-path':
								'polygon(50% 81.6901408450704%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 151,
						height: 69,
						left: 171,
						top: 275,
						zIndex: 3,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '87px',
							height: '10px',
							'line-height': '10px',
							opacity: '1',
							transform: 'rotate(0deg)',
							'font-size': '12px',
							'background-color': 'transparent',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial'
						},
						children: [
							{
								data: {
									'border-top-width': '2px',
									'border-top-style': 'solid',
									'border-top-color': '#000',
									width: '100%',
									height: '5px',
									display: 'inline-block'
								},
								children: []
							}
						]
					},
					content: { type: 1, bgColor: '#000', borderWidth: 2 },
					type: 'line',
					orientationmodel: {
						width: 87,
						height: 10,
						left: 203.5,
						top: 294,
						zIndex: 4,
						rotate: 90
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '40px',
							height: '40px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '2px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fa4949',
							'border-color': '',
							'border-radius': '20px 20px 20px 20px',
							'box-shadow': '0px 0px 0px 0px #000'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 40,
						height: 40,
						left: 227,
						top: 231,
						zIndex: 5,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '11px',
							height: '11px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '0px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#ffffff',
							'border-color': '',
							'border-radius': '20px 20px 20px 20px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '11px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 11,
						height: 11,
						left: 236.5,
						top: 240,
						zIndex: 6,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '38px',
							height: '57px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '2px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '170px 170px 170px 170px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '57px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 38,
						height: 57,
						left: 204.5,
						top: 154,
						zIndex: 7,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '38px',
							height: '57px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '2px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '170px 170px 170px 170px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '57px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 38,
						height: 57,
						left: 247.5,
						top: 154,
						zIndex: 8,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '18px',
							height: '20px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '1px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#000000',
							'border-color': '',
							'border-radius': '220px 220px 220px 220px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '24px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 18,
						height: 20,
						left: 219.5,
						top: 182,
						zIndex: 9,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '18px',
							height: '20px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '1px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#000000',
							'border-color': '',
							'border-radius': '220px 220px 220px 220px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '24px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 18,
						height: 20,
						left: 253,
						top: 182,
						zIndex: 10,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '87px',
							height: '10px',
							'line-height': '10px',
							opacity: '1',
							transform: 'rotate(0deg)',
							'font-size': '12px',
							'background-color': 'transparent',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial'
						},
						children: [
							{
								data: {
									'border-top-width': '2px',
									'border-top-style': 'solid',
									'border-top-color': '#000',
									width: '100%',
									height: '5px',
									display: 'inline-block'
								},
								children: []
							}
						]
					},
					content: { type: 1, bgColor: '#000', borderWidth: 2 },
					type: 'line',
					orientationmodel: {
						width: 87,
						height: 10,
						left: 130,
						top: 220,
						zIndex: 11,
						rotate: 16
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '87px',
							height: '10px',
							'line-height': '10px',
							opacity: '1',
							transform: 'rotate(0deg)',
							'font-size': '12px',
							'background-color': 'transparent',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial'
						},
						children: [
							{
								data: {
									'border-top-width': '2px',
									'border-top-style': 'solid',
									'border-top-color': '#000',
									width: '100%',
									height: '5px',
									display: 'inline-block'
								},
								children: []
							}
						]
					},
					content: { type: 1, bgColor: '#000', borderWidth: 2 },
					type: 'line',
					orientationmodel: {
						width: 87,
						height: 10,
						left: 130,
						top: 252,
						zIndex: 12,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '87px',
							height: '10px',
							'line-height': '10px',
							opacity: '1',
							transform: 'rotate(0deg)',
							'font-size': '12px',
							'background-color': 'transparent',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial'
						},
						children: [
							{
								data: {
									'border-top-width': '2px',
									'border-top-style': 'solid',
									'border-top-color': '#000',
									width: '100%',
									height: '5px',
									display: 'inline-block'
								},
								children: []
							}
						]
					},
					content: { type: 1, bgColor: '#000', borderWidth: 2 },
					type: 'line',
					orientationmodel: {
						width: 87,
						height: 10,
						left: 138.5,
						top: 288,
						zIndex: 13,
						rotate: 336
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: { data: {}, children: [] },
					content: [
						{
							customfeature: {
								eventHandler: '',
								eventParams: null
							},
							style: {
								data: {
									width: '87px',
									height: '10px',
									'line-height': '10px',
									opacity: '1',
									transform: 'rotate(0deg)',
									'font-size': '12px',
									'background-color': 'transparent',
									'font-weight': 'normal',
									'font-style': 'normal',
									'text-decoration': 'initial',
									color: '#000',
									'text-align': 'initial'
								},
								children: [
									{
										data: {
											'border-top-width': '2px',
											'border-top-style': 'solid',
											'border-top-color': '#000',
											width: '100%',
											height: '5px',
											display: 'inline-block'
										},
										children: []
									}
								]
							},
							content: {
								type: 1,
								bgColor: '#000',
								borderWidth: 2
							},
							type: 'line',
							orientationmodel: {
								width: 87,
								height: 10,
								left: 0,
								top: 12,
								zIndex: 14,
								rotate: 16
							}
						},
						{
							customfeature: {
								eventHandler: '',
								eventParams: null
							},
							style: {
								data: {
									width: '87px',
									height: '10px',
									'line-height': '10px',
									opacity: '1',
									transform: 'rotate(0deg)',
									'font-size': '12px',
									'background-color': 'transparent',
									'font-weight': 'normal',
									'font-style': 'normal',
									'text-decoration': 'initial',
									color: '#000',
									'text-align': 'initial'
								},
								children: [
									{
										data: {
											'border-top-width': '2px',
											'border-top-style': 'solid',
											'border-top-color': '#000',
											width: '100%',
											height: '5px',
											display: 'inline-block'
										},
										children: []
									}
								]
							},
							content: {
								type: 1,
								bgColor: '#000',
								borderWidth: 2
							},
							type: 'line',
							orientationmodel: {
								width: 87,
								height: 9.999999999999993,
								left: 0,
								top: 44,
								zIndex: 15,
								rotate: 0
							}
						},
						{
							customfeature: {
								eventHandler: '',
								eventParams: null
							},
							style: {
								data: {
									width: '87.00000000000001px',
									height: '10px',
									'line-height': '10px',
									opacity: '1',
									transform: 'rotate(0deg)',
									'font-size': '12px',
									'background-color': 'transparent',
									'font-weight': 'normal',
									'font-style': 'normal',
									'text-decoration': 'initial',
									color: '#000',
									'text-align': 'initial'
								},
								children: [
									{
										data: {
											'border-top-width': '2px',
											'border-top-style': 'solid',
											'border-top-color': '#000',
											width: '100%',
											height: '5px',
											display: 'inline-block'
										},
										children: []
									}
								]
							},
							content: {
								type: 1,
								bgColor: '#000',
								borderWidth: 2
							},
							type: 'line',
							orientationmodel: {
								width: 87.00000000000001,
								height: 10,
								left: 8.5,
								top: 80,
								zIndex: 16,
								rotate: 336
							}
						}
					],
					type: 'combination',
					orientationmodel: {
						width: 93.5,
						height: 107,
						left: 270,
						top: 194.5,
						zIndex: 14,
						rotate: 180
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '10px',
							height: '10px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '1px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '110px 110px 110px 110px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '10px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 10,
						height: 10,
						left: 225,
						top: 187,
						zIndex: 15,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '10px',
							height: '10px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '1px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '110px 110px 110px 110px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '10px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 10,
						height: 10,
						left: 258,
						top: 187,
						zIndex: 16,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '168px',
							height: '15px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '1px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#cf0000',
							'border-color': '',
							'border-radius': '40px 40px 40px 40px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '11px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 168,
						height: 15,
						left: 163,
						top: 370,
						zIndex: 17,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '44px',
							height: '61px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '2px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#4c96dd',
							'border-color': '',
							'border-radius': '160px 110px 140px 140px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '61px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 44,
						height: 61,
						left: 146,
						top: 357,
						zIndex: 20,
						rotate: 40
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '50px',
							height: '50px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '2px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '70px 70px 70px 70px',
							'box-shadow': '0px 0px 0px 0px #000'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 50,
						height: 50,
						left: 163,
						top: 342,
						zIndex: 21,
						rotate: 0
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '44px',
							height: '61px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '2px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#4c96dd',
							'border-color': '',
							'border-radius': '160px 110px 140px 140px',
							'box-shadow': '0px 0px 0px 0px #000',
							'font-size': '12px',
							'font-weight': 'normal',
							'font-style': 'normal',
							'text-decoration': 'initial',
							color: '#000',
							'text-align': 'initial',
							'line-height': '61px'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 44,
						height: 61,
						left: 307,
						top: 355.5,
						zIndex: 22,
						rotate: 311
					}
				},
				{
					customfeature: { eventHandler: '', eventParams: null },
					style: {
						data: {
							width: '50px',
							height: '50px',
							left: '0px',
							top: '0px',
							padding: '0px',
							'border-width': '2px',
							'border-style': 'solid',
							opacity: '1',
							transform: 'rotate(0deg)',
							'background-color': '#fff',
							'border-color': '',
							'border-radius': '70px 70px 70px 70px',
							'box-shadow': '0px 0px 0px 0px #000'
						},
						children: []
					},
					content: '矩形',
					type: 'rect',
					orientationmodel: {
						width: 50,
						height: 50,
						left: 281,
						top: 342,
						zIndex: 23,
						rotate: 0
					}
				}
			],
			customfeature: {
				title: '多啦A梦',
				name: '多啦A梦',
				isHasTabbar: false,
				bgColor: '#ffffff',
				isHomePage: false,
				navBgColor: '#000000',
				navFrontColor: '#ffffff',
				pageHeight: 736
			}
		}
	},
	app_config: {
		home_page_router: 'page10000',
		tabbar_widget: {
			customfeature: {},
			style: {
				data: {
					'background-color': '#fff',
					height: '50px',
					'font-size': '12px'
				},
				children: []
			},
			content: {
				tabbarModel: {
					navList: [
						{
							title: '标题',
							initImg: '',
							selectImg: '',
							link: '',
							active: false,
							eventHandler: '',
							eventParams: null
						},
						{
							title: '标题',
							initImg: '',
							selectImg: '',
							link: '',
							active: false,
							eventHandler: '',
							eventParams: null
						}
					],
					initColor: '#000',
					checkColor: '#000'
				}
			},
			type: 'tabbar',
			orientationmodel: {
				width: null,
				height: 50,
				left: -100,
				top: -100,
				zIndex: 1,
				rotate: 0
			}
		}
	},
	app_name: '测试小程序',
	remark: null,
	thumb: null,
	template_info: { template_type: null },
	form_data: [],
	type: ''
}
