<?php
    wp_enqueue_scripts();
    wp_enqueue_style('style', get_stylesheet_uri());
	add_theme_support( 'custom-logo' );
	
	function themename_custom_header_setup() {
		$args = array(
			'default-image'      => get_template_directory_uri() . 'img/default-image.jpg',
			'default-text-color' => '000',
			'width'              => 1000,
			'height'             => 250,
			'flex-width'         => true,
			'flex-height'        => true,
		);
		add_theme_support( 'custom-header', $args );
	}
	add_action( 'after_setup_theme', 'themename_custom_header_setup' );

    /**
 * Creates a nicely formatted and more specific title element text
 * for output in head of document, based on current view.
 *
 * @param string $title Default title text for current view.
 * @param string $sep   Optional separator.
 * @return string Filtered title.
 */
function wpdocs_filter_wp_title( $title, $sep ) {
    global $paged, $page;
 
    if ( is_feed() )
        return $title;
 
    // Add the site name.
    $title .= get_bloginfo( 'name' );
 
    // Add the site description for the home/front page.
    $site_description = get_bloginfo( 'description', 'display' );
    if ( $site_description && ( is_home() || is_front_page() ) )
        $title = "$title $sep $site_description";
 
    // Add a page number if necessary.
    if ( $paged >= 2 || $page >= 2 )
        $title = "$title $sep " . sprintf( __( 'Page %s', 'twentytwelve' ), max( $paged, $page ) );
 
    return $title;
}
add_filter( 'wp_title', 'wpdocs_filter_wp_title', 10, 2 );

add_action('widgets_init', 'my_register_sidebars');
function my_register_sidebars() {
    register_sidebar([
        'id'            => 'primary',
        'name'          => __('Primary Sidebar'),
        'description'   => __('A short description of the sidebar'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);
    register_sidebar([
        'id'            => 'footer',
        'name'          => __('Footer'),
        'description'   => __('Footer Bar'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);
}

function register_my_menus() {
    register_nav_menus([
        'header-menu' => __('Header Menu')
    ]);
}
add_action('init', 'register_my_menus');

// Register Custom Post Type
function creature() {

	$labels = array(
		'name'                  => _x( 'Creatures', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Creature', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Creatures', 'text_domain' ),
		'name_admin_bar'        => __( 'Creatures', 'text_domain' ),
		'archives'              => __( 'Creature Archives', 'text_domain' ),
		'attributes'            => __( 'Creature Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Creature:', 'text_domain' ),
		'all_items'             => __( 'All Creatures', 'text_domain' ),
		'add_new_item'          => __( 'Add New Creature', 'text_domain' ),
		'add_new'               => __( 'Add creature', 'text_domain' ),
		'new_item'              => __( 'New Creature', 'text_domain' ),
		'edit_item'             => __( 'Edit Creature', 'text_domain' ),
		'update_item'           => __( 'Update Creature', 'text_domain' ),
		'view_item'             => __( 'View Creature', 'text_domain' ),
		'view_items'            => __( 'View Creatures', 'text_domain' ),
		'search_items'          => __( 'Search Creature', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'text_domain' ),
		'items_list'            => __( 'Items list', 'text_domain' ),
		'items_list_navigation' => __( 'Items list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter items list', 'text_domain' ),
	);
	$args = array(
		'label'                 => __( 'Creature', 'text_domain' ),
		'description'           => __( 'A creature', 'text_domain' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor' ),
		'taxonomies'            => array( 'category', 'post_tag' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'show_in_rest'			=> true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'creature', $args );

}
add_action( 'init', 'creature', 0 );

// Add ACF to REST API
function create_ACF_meta_in_REST() {
	$posttypes_to_exclude = ['acf-field-group', 'acf-field'];
	$extra_posttypes_to_include = ["page"];
	$post_types = array_diff(get_post_types(["_builtin" => false], 'names'), $posttypes_to_exclude);
	
	array_push($post_types, $extra_posttypes_to_include);

	foreach ($post_types as $post_type) {
		register_rest_field($post_type, 'acf', [
			'get_callback' => 'expose_ACF_fields',
			'schema' => null,
		]);
	}
}

function expose_ACF_fields($object) {
	$ID = $object['id'];
	return get_fields($ID);
}

add_action('rest_api_init', 'create_ACF_meta_in_REST');

?>