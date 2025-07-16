'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import s from './about.module.scss';
import { VIDEO_LINKS } from '../constants';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const About = () => {
	const container = useRef(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const aboutTitleRef = useRef<HTMLHeadingElement>(null);

	const videoData = [
		{ src: VIDEO_LINKS.mclaren, title: 'I love mclaren' },
		{ src: VIDEO_LINKS.dota, title: 'I love play dota' },
		{ src: VIDEO_LINKS.code, title: 'I love coding' },
	];

	useGSAP(
		() => {
			ScrollTrigger.matchMedia({
				// desktop
				'(min-width: 768px)': function () {
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: container.current,
							start: 'top top',
							end: '+=4000',
							scrub: true,
							pin: true,
						},
					});

					tl.fromTo(
						aboutTitleRef.current,
						{ opacity: 1 },
						{
							opacity: 0,
							duration: 0.5,
						}
					)
						.fromTo(
							`.${s.videoWrapper}`,
							{
								clipPath: 'inset(35% 25% 35% 25%)',
							},
							{
								clipPath: 'inset(0% 0% 0% 0%)',
								duration: 1,
								ease: 'power2.inOut',
							},
							0
						)
						.fromTo(
							titleRef.current,
							{ opacity: 0, y: 30 },
							{ opacity: 1, y: 0, duration: 0.5 },
							'>-0.5'
						);

					videoData.forEach((video, index) => {
						if (index === 0) return;
						const previousVideo = videoData[index - 1];

						tl.to(titleRef.current, {
							opacity: 0,
							y: -30,
							duration: 0.5,
							ease: 'power2.in',
						})
							.to(
								{},
								{
									// Dummy tween for state change
									duration: 0.001,
									onComplete: () => {
										if (titleRef.current) titleRef.current.innerText = video.title;
										if (videoRef.current) {
											videoRef.current.src = video.src;
											videoRef.current.play();
										}
									},
									onReverseComplete: () => {
										if (titleRef.current) titleRef.current.innerText = previousVideo.title;
										if (videoRef.current) {
											videoRef.current.src = previousVideo.src;
											videoRef.current.play();
										}
									},
								}
							)
							.to(titleRef.current, {
								opacity: 1,
								y: 0,
								duration: 0.5,
								ease: 'power2.out',
							});
					});
				},

				// mobile
				'(max-width: 767px)': function () {
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: container.current,
							start: 'top top',
							end: '+=2000',
							scrub: true,
							pin: true, // Оставим pin для эффекта, но с меньшей продолжительностью
						},
					});

					tl.fromTo(
						aboutTitleRef.current,
						{ opacity: 1 },
						{
							opacity: 0,
							duration: 0.5,
						}
					)
						.fromTo(
							`.${s.videoWrapper}`,
							{
								clipPath: 'inset(30% 0% 30% 0%)', // Раскрытие на всю ширину
							},
							{
								clipPath: 'inset(0% 0% 0% 0%)',
								duration: 1,
								ease: 'power2.inOut',
							},
							0
						)
						.fromTo(
							titleRef.current,
							{ opacity: 0, y: 30 },
							{ opacity: 1, y: 0, duration: 0.5 },
							'>-0.5'
						);

					videoData.forEach((video, index) => {
						if (index === 0) return;
						const previousVideo = videoData[index - 1];

						tl.to(titleRef.current, {
							opacity: 0,
							y: -30,
							duration: 0.5,
							ease: 'power2.in',
						})
							.to(
								{},
								{
									duration: 0.001,
									onComplete: () => {
										if (titleRef.current) titleRef.current.innerText = video.title;
										if (videoRef.current) {
											videoRef.current.src = video.src;
											videoRef.current.load();
											videoRef.current.onloadeddata = () => {
												if (videoRef.current) videoRef.current.play().catch(() => {});
											};
										}
									},
									onReverseComplete: () => {
										if (titleRef.current) titleRef.current.innerText = previousVideo.title;
										if (videoRef.current) {
											videoRef.current.src = previousVideo.src;
											videoRef.current.load();
											videoRef.current.onloadeddata = () => {
												if (videoRef.current) videoRef.current.play().catch(() => {});
											};
										}
									},
								}
							)
							.to(titleRef.current, {
								opacity: 1,
								y: 0,
								duration: 0.5,
								ease: 'power2.out',
							});
					});
				},
			});
		},
		{ scope: container }
	);

	return (
		<section ref={container} id="aboutWrapper" className={s.aboutWrapper}>
			<h2 ref={aboutTitleRef} className={s.title}>
				A little about me
			</h2>

			<div className={s.videoWrapper}>
				<video ref={videoRef} src={videoData[0].src} autoPlay muted loop playsInline className={s.video} />
				<h3 ref={titleRef} className={s.videoTitle}>
					{videoData[0].title}
				</h3>
			</div>
		</section>
	);
};

export default About; 