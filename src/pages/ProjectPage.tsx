import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../utils/projectData';
import { IoClose } from 'react-icons/io5';

const ProjectPage: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === projectSlug);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
  }

  return (
    <div className="bg-[oklch(0.18_0_0)] text-[#e5e7eb] min-h-screen">
        <motion.button
            onClick={() => navigate(-1)}
            className="fixed top-[1.5rem] right-[1.5rem] text-white z-[1001]"
            whileHover={{ scale: 1.1, rotate: 90 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
            <IoClose size="2.5rem" />
        </motion.button>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen pt-[8rem] pb-[4rem] px-[1rem] md:px-[2rem]"
        >
            <motion.h2
                layoutId={`title-${project.slug}`}
                className="text-center text-white text-[8vw] md:text-[6vw] font-[900] leading-none mb-[4rem]"
            >
                {project.name}
            </motion.h2>
            <div className="flex flex-col items-center">
                {project.allImages.map((image, index) => (
                    <motion.div
                        key={index}
                        className="my-[2rem] w-full max-w-[800px]"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: 'circOut' }}
                    >
                        <img src={image} alt={`screenshot ${index + 1}`} className="w-full h-auto rounded-lg shadow-2xl" />
                    </motion.div>
                ))}
            </div>
            <div className="text-center mt-[4rem]">
                <div>
                    <p className="text-gray-400 text-[1.5rem] md:text-[2rem]">{project.category}</p>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default ProjectPage; 