const createElfMaleAnims = (anims) => {
    //Create Idle Animation
    anims.create({
        key: 'elf_m-idle',
        frames: anims.generateFrameNames('elf_m', {start: 0, end: 3, prefix: 'elf_m_idle_anim_f', suffix: '.png'}),
        repeat: -1,
        frameRate: 7,
    });
    //Create Run Right Animation
    anims.create({
        key: 'elf_m-run-r',
        frames: anims.generateFrameNames('elf_m', {start: 0, end: 3, prefix: 'elf_m_run_anim_f', suffix: '.png'}),
        repeat: -1,
        frameRate: 5,
    });
};

export {
    createElfMaleAnims
}