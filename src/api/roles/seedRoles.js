module.exports = async ({ strapi }) => {
    const roleService = strapi.plugins['users-permissions'].services.role;

    // Create Public role if not exists
    const publicRole = await roleService.getRole('public');
    if (!publicRole) {
        await roleService.createRole({
            name: 'Public',
            description: 'Default role given to unauthenticated users.',
        });
    }

    // Create Authenticated role if not exists
    const authenticatedRole = await roleService.getRole('authenticated');
    if (!authenticatedRole) {
        await roleService.createRole({
            name: 'Authenticated',
            description: 'Default role given to authenticated users.',
        });
    }

    console.log('Roles created/verified successfully!');
};
